﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SurveySample.Domain.Entities
{
    public class Survey
    {
        [Key]
        public int id { get; set; }

        [Required]
        [StringLength(250, MinimumLength = 1)]
        public string surveyTitle { get; set; }

        public virtual IEnumerable<Question>? questions { get; set; }
    }
}
