using System;
using System.Collections.Generic;
using System.Text;

namespace SurveySample.Domain.Entities
{
    public class QuestionOption
    {
        public int Id { get; set; }
        public string OptionText { get; set; }


        public virtual Question Question { get; set; }
    }
}
