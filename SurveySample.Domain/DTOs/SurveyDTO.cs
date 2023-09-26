using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;


namespace SurveySample.Domain.DTOs
{
    public class SurveyDTO
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string SurveyTitle { get; set; }
    }
}
