using Microsoft.EntityFrameworkCore;
using SurveySample.Domain.Services;
using SurveySample.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveySample.Infrastructure.Services
{
    public class QuestionOptionService : IQuestionOptionService
    {
        private readonly AppDbContext db;
        public QuestionOptionService(AppDbContext db)
        {
            this.db = db;
        }

        public void Add(QuestionOption questionOption)
        {
            db.Add(questionOption);
            db.SaveChanges();
        }

        public void Delete(QuestionOption questionOption)
        {
            db.Remove(questionOption);
            db.SaveChanges();
        }

        public QuestionOption? Get(int id)
        {
            return db.QuestionOptions.FirstOrDefault(e => e.id == id);
        }

        public void Update(QuestionOption questionOption)
        {
            db.QuestionOptions.Update(questionOption);
            db.SaveChanges();
        }

    }
}
