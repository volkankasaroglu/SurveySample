using SurveySample.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveySample.Domain.Services
{
    public interface IQuestionOptionService
    {
        void Add(QuestionOption questionOption);
        void Update(QuestionOption questionOption);
        void Delete(QuestionOption questionOption);
        QuestionOption Get(int id);
    }
}
