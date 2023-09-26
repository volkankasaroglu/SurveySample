using SurveySample.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveySample.Domain.Services
{
    public interface IQuestionService
    {
        void Add(Question question);
        void Update(Question question);
        void Delete(Question question);
        void AddVote(int QuestionOptionId);
        Question? Get(int id);
        IEnumerable<Question> GetSurveyQuestions(int surveyId);
        IEnumerable<QuestionOption> GetQuestionOptions(int id);
    }
}
