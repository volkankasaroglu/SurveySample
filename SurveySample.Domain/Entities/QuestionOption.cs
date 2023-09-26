using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SurveySample.Domain.Entities
{
    public class QuestionOption
    {
        [Key]
        public int id { get; set; }

        [Required]
        [StringLength(250, MinimumLength = 1)]
        public string optionText { get; set; }

        [Required]
        public int questionId { get; set; }

    }
    
}
