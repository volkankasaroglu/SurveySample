using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SurveySample.Domain.DTOs;
using SurveySample.Domain.Entities;
using SurveySample.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveySample.Web.Controllers
{
    [Route("api/questionOption")]
    [ApiController]
    public class QuestionOptionController : ControllerBase
    {
        private IQuestionOptionService QuestionOptionService;
        private IMapper Mapper;
        public QuestionOptionController(IQuestionOptionService questionOptionService, IMapper mapper)
        {
            QuestionOptionService = questionOptionService;
            Mapper = mapper;
        }
        [HttpGet]
        public IActionResult Get(int id)
        {
            var questionOption = QuestionOptionService.Get(id);
            if (questionOption != null)
            {
                var dto = Mapper.Map<QuestionOptionDTO>(questionOption);
                return Ok(dto);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPost]
        public IActionResult Post(QuestionOptionDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState);
            }
            var questionOption = Mapper.Map<QuestionOption>(dto);
            QuestionOptionService.Add(questionOption);
            return Ok();
        }
        [HttpPut]
        public IActionResult Update(QuestionOptionDTO model, int id)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState);
            }
            var questionOption = QuestionOptionService.Get(id);
            questionOption = Mapper.Map(model, questionOption);
            QuestionOptionService.Update(questionOption);
            return Ok();
        }
        [HttpDelete]
        public IActionResult Delete(int? id)
        {
            if (id.HasValue)
            {
                var questionOption = QuestionOptionService.Get(id.Value);
                if (questionOption != null)
                {
                    QuestionOptionService.Delete(questionOption);
                    return Ok();
                }
                else
                {
                    return NotFound();
                }

            }
            return NotFound();
        }

    }
}
