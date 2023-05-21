using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace OnlineExam.Models
{
    public class VMLogin
    {

        [Required]
        //[Display(Name = "Email")]
        //[EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Required]
        [Display(Name = "Email")]
        //[EmailAddress]
        public string EmailAdmin { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string PasswordAdmin { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }

    }
    public class VMRegistration :VMLogin
    {
        public int RegistrationDetailsId { get; set; }
        
        [Required]
        [Display(Name = "Username")]
        public string UserName { get; set; }

        public int CollegeId { get; set; }

        [Required]
        [Display(Name = "MobileNumber")]
        public string MobileNumber { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        public string ConfirmPassword { get; set; }
        public int CreatedBy { get; set; }
        public string IPAddress { get; set; }
        public string MACAddress { get; set; }
        public string AdminMobileNo { get; set; }
        public string AdminEMail { get; set; }
        public string LastVisitedURL { get; set; }
    }
}