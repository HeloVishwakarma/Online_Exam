using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineExam.Areas.Admin.ViewModel
{
    public class VmStudentApproval :VmExam
    {
        public int SerialNumber { get; set; }
        public string UserName { get; set; }
        public string MobileNumber { get; set; }
        public bool ApprovalStatus { get; set; }
        public string Email { get; set; }
        public int LoginRegistration { get; set; }
        public string BulkStudentApproval { get; set; }
    }
}