using System;
using Xunit;
using FakeItEasy;
using SurveySample.Web.Controllers;
using SurveySample.Domain.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SurveySample.Domain.DTOs;
using SurveySample.Domain.Entities;
using Microsoft.AspNetCore.Http;
using SurveySample.Web;


namespace SurveySample.Tests
{
    public class SurveyControllerTests
    {
        IMapper _mapper;

        public SurveyControllerTests()
        {
            var mapperConfig = new MapperConfiguration(cfg => cfg.AddProfile(new MapperProfile()));

            _mapper = mapperConfig.CreateMapper();
        }
        [Fact]
        public void Get_Returns_The_Correct_Survey()
        {
            //  Arrange
            var id = 1;
            var surveyService = A.Fake<ISurveyService>();
            var fakeSurvey = new Survey();
            fakeSurvey.surveyTitle = "This is a test survey";
            A.CallTo(() => surveyService.Get(id)).Returns(fakeSurvey);
            var controller = new SurveyController(surveyService, _mapper);

            //Act
            var result = controller.Get(id);
            var okResult = result as OkObjectResult;
            var resultSurvey = okResult.Value as SurveyDTO;

            // assert
            Assert.NotNull(okResult);
            Assert.True(okResult is OkObjectResult);
            Assert.IsType<SurveyDTO>(okResult.Value);
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
            Assert.Equal(fakeSurvey.surveyTitle, resultSurvey.surveyTitle);
        }

        [Fact]
        public void Get_Returns_The_Correct_Number_Of_Surveys()
        {

            //  Arrange
            var count = 7;
            var fakeSurveys = A.CollectionOfDummy<Survey>(count).AsEnumerable();
            var surveyService = A.Fake<ISurveyService>();

            A.CallTo(() => surveyService.GetAll()).Returns(fakeSurveys);
            var controller = new SurveyController(surveyService, _mapper);

            //Act
            var result = controller.Get(null);
            var okResult = result as OkObjectResult;
            var resultSurveys = okResult.Value as List<SurveyIndexDTO>;
            // assert
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
            Assert.NotNull(okResult);
            Assert.True(okResult is OkObjectResult);
            Assert.IsType<List<SurveyIndexDTO>>(okResult.Value);
            Assert.Equal(count, resultSurveys.Count);
        }

        [Fact]
        public void Get_Returns_The_Correct_Number_Of_Survey_Questions()
        {

            //  Arrange
            var id = 1;
            var count = 38;
            var fakeQuestions = A.CollectionOfDummy<Question>(count).AsEnumerable();
            var surveyService = A.Fake<ISurveyService>();

            A.CallTo(() => surveyService.GetSurveyQuestions(id)).Returns(fakeQuestions);
            var controller = new SurveyController(surveyService, _mapper);

            //Act
            var result = controller.GetSurveyQuestions(id);
            var okResult = result as OkObjectResult;
            var resultSurveys = okResult.Value as List<Question>;
            // assert
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
            Assert.NotNull(okResult);
            Assert.True(okResult is OkObjectResult);
            Assert.IsType<List<Question>>(okResult.Value);
            Assert.Equal(count, resultSurveys.Count);
        }

        [Fact]
        public void Post_Returns_The_Correct_StatusCode()
        {
            //  Arrange 
            var surveyService = A.Fake<ISurveyService>();
            var fakeSurvey = A.Fake<Survey>();
            A.CallTo(() => surveyService.Add(fakeSurvey)).DoesNothing();
            var controller = new SurveyController(surveyService, _mapper);

            //Act
            var result = controller.Post(A.Fake<SurveyDTO>());
            var okResult = result as OkResult;

            // assert
            Assert.NotNull(okResult);
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
        }

        [Fact]
        public void Update_Returns_The_Correct_StatusCode()
        {
            //  Arrange
            var id = 1;
            var surveyService = A.Fake<ISurveyService>();
            var fakeSurvey = A.Fake<Survey>();
            A.CallTo(() => surveyService.Update(fakeSurvey)).DoesNothing();
            var controller = new SurveyController(surveyService, _mapper);

            //Act
            var result = controller.Update(A.Fake<SurveyDTO>(), id);
            var okResult = result as OkResult;

            // assert
            Assert.NotNull(okResult);
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
        }


        [Fact]
        public void Delete_Returns_The_Correct_StatusCode()
        {
            //  Arrange
            var id = 1;
            var surveyService = A.Fake<ISurveyService>();
            var fakeSurvey = A.Fake<Survey>();
            A.CallTo(() => surveyService.Delete(fakeSurvey)).DoesNothing();
            var controller = new SurveyController(surveyService, _mapper);

            //Act
            var result = controller.Delete(id);
            var okResult = result as OkResult;

            // assert
            Assert.NotNull(okResult);
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
        }

    }
}