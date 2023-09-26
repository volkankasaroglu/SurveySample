using SurveySample.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveySample.Domain.DTOs
{
    public class QuestionDTO
    {
        public int id { get; set; }
        public string questionText { get; set; }
        public int surveyId { get; set; }

        public virtual IEnumerable<QuestionOption>? questionOptions { get; set; }

    }
}
