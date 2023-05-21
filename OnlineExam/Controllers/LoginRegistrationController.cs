using DAL;
using OnlineExam.Models;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;

namespace OnlineExam.Controllers
{
    public class LoginRegistrationController : Controller
    {
        SqlHelper objSQLHelper = new SqlHelper();
        // GET: LoginRegistration
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult Register(VMRegistration vMRegistration)
        {
            object ret = 0;
            try
            {
                SqlParameter[] objParams = null;
                objParams = new SqlParameter[6];
                objParams[0] = new SqlParameter("@UserName", vMRegistration.UserName);
                objParams[1] = new SqlParameter("@Password", vMRegistration.Password);
                objParams[2] = new SqlParameter("@ConfirmPassword", vMRegistration.ConfirmPassword);
                objParams[3] = new SqlParameter("@MobileNumber", vMRegistration.MobileNumber);
                objParams[4] = new SqlParameter("@Email", vMRegistration.Email);
                objParams[5] = new SqlParameter("@R_Out", SqlDbType.Int);
                objParams[5].Direction = ParameterDirection.Output;
                ret = objSQLHelper.ExecuteNonQuerySP("UspInsertRegistration", objParams, true);
                return Json(ret);
            }
            catch (Exception ex)
                    {
                    ret = -99;
                    return Json(ex);
                    }
        }
        public ActionResult UserLogout()
        {
            Session.Abandon();
            return RedirectToAction("Index", "LoginRegistration");
        }
        

        public ActionResult StudentLogin(VMRegistration vmLogin)
        {
            object ret = 0;
            try
            {

                SqlParameter[] objParams = null;
                objParams = new SqlParameter[3];
                objParams[0] = new SqlParameter("@UserName", vmLogin.Email);
                objParams[1] = new SqlParameter("@UserPassword", vmLogin.Password);
                objParams[2] = new SqlParameter("@R_Out", SqlDbType.Int);
                objParams[2].Direction = ParameterDirection.Output;

                ret = objSQLHelper.ExecuteNonQuerySP("[dbo].[StudentLogin]", objParams, true);


                if (Convert.ToInt32(ret) == 1)
                {
                    Session["Status"] = ret;
                    return Redirect("/Exam/ExamDashBoard/Index");
                }
                else
                {
                    TempData["Status"] = ret;
                    return RedirectToAction("Index", "LoginRegistration");
                }
            }

            catch (Exception ex)
            {
                ret = -99;
                return Json(ex);
            }
            //return Json(ret);

        }
        public ActionResult AdminLogin(VMRegistration vmLogin)
        {
            object ret = 0;
            try
            {

                SqlParameter[] objParams = null;
                objParams = new SqlParameter[3];
                objParams[0] = new SqlParameter("@UserName", vmLogin.EmailAdmin);
                objParams[1] = new SqlParameter("@UserPassword", vmLogin.PasswordAdmin);
                objParams[2] = new SqlParameter("@R_Out", SqlDbType.Int);
                objParams[2].Direction = ParameterDirection.Output;

                ret = objSQLHelper.ExecuteNonQuerySP("[dbo].[AdminLogin]", objParams, true);


                if (Convert.ToInt32(ret) == 1)
                {
                    Session["Status"]  = ret;
                    return Redirect("/Admin/AdminDashboard/Index");
                }
                else
                {
                    TempData["Status"] = ret;
                    return RedirectToAction("Index", "LoginRegistration");
                }
            }

            catch (Exception ex)
            {
                ret = -99;
                return Json(ex);
            }
            //return Json(ret);

        }
    }
} 