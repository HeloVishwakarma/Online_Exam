using DAL;
using OnlineExam.Areas.Admin.ViewModel;
using OnlineExam.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace OnlineExam.Areas.Admin.Controllers
{
    [SessionActionFilters]
    public class StudentApprovalController : Controller
    {
        SqlHelper objSQLHelper = new SqlHelper();
        // GET: Admin/StudentApproval
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetAllStudentApproval(VmStudentApproval vmStudentApproval)
        {
            try
            {
                SqlParameter[] objParams = new SqlParameter[3];
                SqlDataReader sdr;
                objParams[0] = new SqlParameter("@CommandType", "GetStudentApproval");
                if (vmStudentApproval.StartDate != null)
                {
                    //par[3] = new SqlParameter("@Fromdate", DateTime.Parse(vmRegRep.FromDate));
                    objParams[1] = new SqlParameter("@StartDate", DateTime.ParseExact(vmStudentApproval.StartDate, "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("yyyy-MM-dd"));
                }
                else
                {
                    objParams[1] = new SqlParameter("@StartDate", null);
                }

                if (vmStudentApproval.EndDate != null)
                {
                    //par[4] = new SqlParameter("@Todate", DateTime.Parse(vmRegRep.ToDate));
                    objParams[2] = new SqlParameter("@EndDate", DateTime.ParseExact(vmStudentApproval.EndDate, "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("yyyy-MM-dd"));
                }
                else
                {
                    objParams[2] = new SqlParameter("@EndDate", null);
                }
                sdr = objSQLHelper.ExecuteReaderSP("[UspGetCollegeConfiguration]", objParams);
                List<VmStudentApproval> studApproval = new List<VmStudentApproval>();
                while (sdr.Read())
                {
                    studApproval.Add(new VmStudentApproval()
                    {
                        SerialNumber = Convert.ToInt32(sdr["SerialNumber"]),
                        UserName = Convert.ToString(sdr["UserName"]),
                        MobileNumber = Convert.ToString(sdr["MobileNumber"]),
                        ApprovalStatus = Convert.ToBoolean(sdr["ApprovalStatus"]),
                        StartDate = Convert.ToString(sdr["StartDate"]),
                        Email  = Convert.ToString(sdr["Email"]),
                        LoginRegistration = Convert.ToInt32(sdr["LoginRegistration"])
                    });
                }
                return Json(studApproval,JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult SingleStudentApproval(VmStudentApproval vmStudentApproval)
        {
            object ret = 0;
            try
            {
                SqlParameter[] objParams = null;
                objParams = new SqlParameter[3];
                objParams[0] = new SqlParameter("@LoginRegistration", vmStudentApproval.LoginRegistration);
                objParams[1] = new SqlParameter("@CommandType", "SingleStudentApproval");
                objParams[2] = new SqlParameter("@R_Out", SqlDbType.Int);
                objParams[2].Direction = ParameterDirection.Output;
                ret = objSQLHelper.ExecuteNonQuerySP("UspInsertStudentApproval", objParams, true);
            }
            catch (Exception ex)
            {
                ret = -99;
                return Json(ex);
            }
            return Json(ret,JsonRequestBehavior.AllowGet);
        }

        public int BulkStudentApproval(VmStudentApproval vmStudentApproval)
        {
            try
            {
                SqlParameter[] objParams = null;
                objParams = new SqlParameter[3];
                objParams[0] = new SqlParameter("@LoginRegistration", vmStudentApproval.BulkStudentApproval);
                objParams[1] = new SqlParameter("@CommandType", "BulkStudentApproval");
                objParams[2] = new SqlParameter("@R_Out", SqlDbType.Int);
                objParams[2].Direction = ParameterDirection.Output;

                object ret = objSQLHelper.ExecuteNonQuerySP("[dbo].[UspUpdateStudentBulkVerification]", objParams, true);

                if (ret.ToString().Equals("-99"))
                    return -99;
                else if (ret.ToString().Equals("0"))
                    return 0;
                else
                    return (int)ret;
            }
            catch (Exception ex)
            {
                return -99;
            }
        }

    }
}