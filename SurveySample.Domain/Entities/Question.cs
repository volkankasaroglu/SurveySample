using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SurveySample.Domain.Entities
{
    public class Question
    {
        [Key]
        public int id { get; set; }

        [Required]
        [MaxLength(500)] 
        public string questionText { get; set; }

        [ForeignKey("Survey")]
        public int surveyId { get; set; }

        public virtual IEnumerable<QuestionOption>? questionOptions { get; set; }
    }
}
