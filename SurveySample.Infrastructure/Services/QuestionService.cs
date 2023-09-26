using SurveySample.Domain.Services;
using SurveySample.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveySample.Infrastructure.Services
{
    public class QuestionService:IQuestionService
    {
        private readonly AppDbContext db;
        public QuestionService(AppDbContext db)
        {
            this.db = db;
        }

        public void Add(Question question)
        {
            db.Add(question);
            db.SaveChanges();
        }

        public void Delete(Question question)
        {
            db.Remove(question);
            db.SaveChanges();
        }

        public Question? Get(int id)
        {
            return db.Questions.Include(a => a.questionOptions).FirstOrDefault(e => e.id == id);
        }
        public IEnumerable<Question> GetSurveyQuestions(int surveyId)
        {
            return db.Questions.Where(e => e.surveyId == surveyId).Include(a => a.questionOptions).AsEnumerable();
        }
        public void AddVote(int QuestionOptionId)
        {
            var questionOption = db.QuestionOptions.First(e => e.id == QuestionOptionId);
            questionOption.voteCount++;
            db.Entry(questionOption).State = EntityState.Modified;

            db.SaveChanges();
        }

        public void Update(Question question)
        {
            db.Entry(question).State = EntityState.Modified;

            if (question.questionOptions != null)
            {
                // QuestionOption nesnelerini kontrol et
                foreach (var questionOption in question.questionOptions)
                {
                    if (questionOption.id == 0) // Yeni eklenmiş bir nesne
                    {
                        db.QuestionOptions.Add(questionOption);
                    }
                    else // Zaten var olan bir nesne
                    {
                        db.Entry(questionOption).State = EntityState.Modified;
                    }
                }
            }

            db.SaveChanges();
        }

        public IEnumerable<QuestionOption> GetQuestionOptions(int id)
        {
            return db.QuestionOptions.Where(a=> a.questionId == id).ToList();
        }

    }
}
