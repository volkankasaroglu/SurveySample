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

    [Route("api/survey")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        private ISurveyService SurveyService;
        private IMapper Mapper;
        public SurveyController(ISurveyService surveyService, IMapper mapper)
        {
            SurveyService = surveyService;
            Mapper = mapper;
        }
        [HttpGet]
        public IActionResult Get(int? id)
        {
            if (id.HasValue)
            {
                var survey = SurveyService.Get(id.Value);
                if (survey != null)
                {
                    var dto = Mapper.Map<SurveyDTO>(survey);
                    return Ok(dto);
                }
                else
                {
                    return NotFound();
                }

            }
            var surveys = SurveyService.GetAll();
            var model = Mapper.Map<IEnumerable<SurveyIndexDTO>>(surveys);
            return Ok(model);
        }
        [HttpPost]
        public IActionResult Post(SurveyDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState);
            }
            var survey = Mapper.Map<Survey>(dto);
            SurveyService.Add(survey);
            return Ok();
        }
        [HttpPut]
        public IActionResult Update(SurveyDTO model, int id)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState);
            }
            var survey = SurveyService.Get(id);
            survey = Mapper.Map(model, survey);
            SurveyService.Update(survey);
            return Ok();
        }
        [HttpDelete]
        public IActionResult Delete(int? id)
        {
            if (id.HasValue)
            {
                var survey = SurveyService.Get(id.Value);
                if (survey != null)
                {
                    SurveyService.Delete(survey);
                    return Ok();
                }
                else
                {
                    return NotFound();
                }

            }
            return NotFound();
        }
        [Route("/api/surveyQuestions")]
        [HttpGet]
        public IActionResult GetSurveyQuestions(int id)
        {

            var surveys = SurveyService.GetSurveyQuestions(id);
            return Ok(surveys);
        }

    }
}
