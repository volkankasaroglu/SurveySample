using System;
using System.Collections.Generic;
using System.ComponentModel;
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
        [MaxLength(250)] 
        public string optionText { get; set; }

        [ForeignKey("Question")]
        public int questionId { get; set; }

        [DefaultValue(0)]
        public int voteCount { get; set; }


    }
    
}
