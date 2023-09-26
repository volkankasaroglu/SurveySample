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
    public class SurveyService : ISurveyService
    {
        private readonly AppDbContext db;
        public SurveyService(AppDbContext db)
        {
            this.db = db;
        }

        public void Add(Survey survey)
        {
            db.Add(survey);
            db.SaveChanges();
        }

        public void Delete(Survey survey)
        {
            db.Remove(survey);
            db.SaveChanges();
        }

        public Survey? Get(int id)
        {
            return db.Surveys.Include(a=>a.questions).FirstOrDefault(e => e.id == id);
        }
        public IEnumerable<Survey> GetAll()
        {
            return db.Surveys.Include(a => a.questions).AsEnumerable();
        }

        public void Update(Survey survey)
        {
            // Veritabanından mevcut Survey nesnesini getirin
            survey.questions = db.Questions.Where(e => e.surveyId == survey.id);

            db.SaveChanges();
        }

        public IEnumerable<Question> GetSurveyQuestions(int id)
        {
            return db.Questions.Where(a => a.surveyId == id).ToList();
        }

    }
}
