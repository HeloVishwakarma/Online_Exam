using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineExam.Areas.Admin.ViewModel
{
    public class VmExam
    {

        public int ExamId { get; set; }
        public string Exam { get; set; }
        public int ExamTypeId { get; set; }
        public string ExamType { get; set; }
        public int ExamNameId { get; set; }
        public string ExamName { get; set; }
        public bool IsActive { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Starttime { get; set; }
        public string Endtime { get; set; }
        public int CreatedBy { get; set; }
    }
    public class VmExamList
    {
        public List<VmExam> ExamList { get; set; }
    }
    public class VmGetExam
    {
        public int ExamId { get; set; }
        public int ExamName { get; set; }
    }
    public class VmGetExamType
    {
        public int ExamTypeId { get; set; }
        public int ExamType { get; set; }
    }
    public class DropdownList
    {
    public List<VmGetExam> GetExamList {get;set;}
    public List<VmGetExamType> GetExamType{ get;set;}
    }
}