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
            return db.Questions.Include(a=>a.QuestionOptions).FirstOrDefault(e => e.Id == id);
        }

        public void Update(Question question)
        {
            db.Questions.Update(question);
            db.SaveChanges();
        }

        public IEnumerable<QuestionOption> GetQuestionOptions(int id)
        {
            return db.QuestionOptions.Where(a=> a.Question.Id == id).ToList();
        }

    }
}
