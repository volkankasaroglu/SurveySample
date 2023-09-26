using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SurveySample.Domain.DTOs;
using SurveySample.Domain.Entities;
using SurveySample.Domain.Services;
using SurveySample.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace SurveySample.Web.Controllers
{
    [Route("api/question")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private IQuestionService QuestionService;
        private IMapper Mapper;
        public QuestionController(IQuestionService questionService, IMapper mapper)
        {
            QuestionService = questionService;
            Mapper = mapper;
        }
        [HttpGet]
        public IActionResult Get(int id)
        {         
            var question = QuestionService.Get(id);
            if (question != null)
            {
                var dto = Mapper.Map<QuestionDTO>(question);
                return Ok(dto);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("GetSurveyQuestions")]
        public IActionResult GetSurveyQuestions(int surveyId)
        {
            var questions = QuestionService.GetSurveyQuestions(surveyId);
            var model = Mapper.Map<IEnumerable<Question>>(questions);
            return Ok(model);
        }

        [HttpPost]
        public IActionResult Post([FromBody] QuestionDTO questionDTO)
        {
            if (!ModelState.IsValid)
            {
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var error in modelState.Errors)
                    {
                        Console.WriteLine(error.ErrorMessage);
                    }
                }
                return BadRequest(ModelState);
            }

            var question = Mapper.Map<Question>(questionDTO);
            QuestionService.Add(question);

            return Ok();
        }
        [HttpPut("Vote/Add/{questionOptionId}")]
        public IActionResult AddVote(int questionOptionId)
        { 
            QuestionService.AddVote(questionOptionId);

            return Ok();
        }
        [HttpPut]
        public IActionResult Update(QuestionDTO model, int id)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState);
            }
            var question = QuestionService.Get(id);
            question = Mapper.Map(model, question);
            QuestionService.Update(question);
            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete(int? id)
        {
            if (id.HasValue)
            {
                var question = QuestionService.Get(id.Value);
                if (question != null)
                {
                    QuestionService.Delete(question);
                    return Ok();
                }
                else
                {
                    return NotFound();
                }

            }
            return NotFound();
        }
        [Route("/api/questionOptions")]
        [HttpGet]
        public IActionResult GetQuestionOptions(int id)
        {
            var options = QuestionService.GetQuestionOptions(id);
            return Ok(options);
        }

    }
}
