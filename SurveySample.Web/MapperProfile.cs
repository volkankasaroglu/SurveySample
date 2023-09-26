using AutoMapper;
using SurveySample.Domain.DTOs;
using SurveySample.Domain.Entities;

namespace SurveySample.Web
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Survey, SurveyDTO>().ReverseMap();
            CreateMap<Survey, SurveyIndexDTO>().ReverseMap();
            CreateMap<Question, QuestionDTO>().ReverseMap();
            CreateMap<Question, QuestionIndexDTO>().ReverseMap();
            CreateMap<QuestionOption, QuestionOptionDTO>().ReverseMap();
            CreateMap<QuestionOption, QuestionOptionIndexDTO>().ReverseMap();
        }
    }
}
