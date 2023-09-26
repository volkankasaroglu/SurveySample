using SurveySample.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveySample.Domain.Services
{
    public interface ISurveyService
    {
        void Add(Survey survey);
        void Update(Survey survey);
        void Delete(Survey survey);
        Survey? Get(int id);
        IEnumerable<Survey> GetAll();
        IEnumerable<Question> GetSurveyQuestions(int id);
    }
}
