using SurveySample.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveySample.Domain.DTOs
{
    public class QuestionOptionDTO
    {
        [Required]
        [StringLength(Int32.MaxValue, MinimumLength = 1)]
        public string OptionText { get; set; }

        [Required]
        public int QuestionId { get; set; }

    }
}
