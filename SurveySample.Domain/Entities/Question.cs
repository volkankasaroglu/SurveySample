using System;
using System.Collections.Generic;
using System.Text;

namespace SurveySample.Domain.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }


        public virtual IEnumerable<QuestionOption>? QuestionOptions { get; set; }
        public virtual Survey Survey { get; set; }
    }
}
