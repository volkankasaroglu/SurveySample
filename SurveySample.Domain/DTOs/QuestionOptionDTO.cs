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
        public int id { get; set; }
        public string optionText { get; set; }
        public int questionId { get; set; }
    }
}
