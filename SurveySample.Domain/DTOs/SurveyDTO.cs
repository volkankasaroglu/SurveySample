using SurveySample.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;


namespace SurveySample.Domain.DTOs
{
    public class SurveyDTO
    {
        public int id { get; set; }
        public string surveyTitle { get; set; }
        public virtual IEnumerable<Question>? questions { get; set; }
    }
}
