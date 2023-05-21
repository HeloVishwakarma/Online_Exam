using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineExam.Areas.Admin.ViewModel
{
    public class VmExamQuestion
    {
        public int QuestionTypeId { get; set; }
        public string QuestionTypeName { get; set; }
    }
   public class VMQuestionDefinitionPost : VMQuestionDefinition
    {
        public List<VMQuestionOptions> questionOptions { get; set; }
        public string MACAddress { get; set; }
        public string IPAddress { get; set; }
        public string ModifiedDate { get; set; }
        public int UserId { get; set; }
    }

    public class VMQuestionDefinition
    {
        public int FeedBackQuestionsId { get; set; }
        public decimal SerialNumber { get; set; }
        public string Questions { get; set; }
        public int MaxOptionSelection { get; set; }
        public bool IsCompulsary { get; set; }
        public bool IsActive { get; set; }
        public int QuestionsTypeId { get; set; }
        public int CollegeId { get; set; }
        public string OptionsName { get; set; }
        public bool IsAnswer { get; set; }
        public string Active { get; set; }
        public string Course { get; set; }
        public int CourselevelId { get; set; }
        public int CourseId { get; set; }
    }

    public class VMQuestionOptions
    {
        public int QuestionOptionsId { get; set; }
        public string OptionsName { get; set; }
        public bool IsAnswer { get; set; }
    }
}