using System;
using System.Collections.Generic;
using System.Text;

namespace SurveySample.Domain.Entities
{
    public class Survey
    {
        public int Id { get; set; }
        public string SurveyTitle { get; set; }

        public virtual IEnumerable<Question>? Questions { get; set; }
    }
}
