using DAL;
using OnlineExam.Areas.Admin.ViewModel;
using OnlineExam.Common;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineExam.Areas.Admin.Controllers
{
    [SessionActionFilters]
    public class CollegeConfigurationController : Controller
    {
        SqlHelper objSQLHelper = new SqlHelper();
        // GET: Admin/CollegeConfiguration
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult StudentApproval(VmCollegeConfiguration vmCollegeConfiguration)
        {

                object ret = 0;
                try
                {
                    SqlParameter[] objParams = null;
                    objParams = new SqlParameter[2];
                    objParams[0] = new SqlParameter("@StudentApproval", vmCollegeConfiguration.StudentApproval);
                    objParams[1] = new SqlParameter("@R_Out", SqlDbType.Int);
                    objParams[1].Direction = ParameterDirection.Output;
                    ret = objSQLHelper.ExecuteNonQuerySP("UspInsertUpdateCollegeConfiguration", objParams, true);
                }
                catch (Exception ex)
                {
                    ret = -99;
                    return Json(ex);
                }
                return Json(ret);
            }

        [HttpGet]
        public JsonResult GetCollegeConfig()
        {
            try
            {
                SqlDataReader sdr;
                VmCollegeConfiguration vmCollegeConfiguration = new VmCollegeConfiguration();
                SqlParameter[] objParams = new SqlParameter[1];
                objParams[0] = new SqlParameter("@CommandType", "GetCollegeConfiguration");

                sdr = objSQLHelper.ExecuteReaderSP("UspGetCollegeConfiguration", objParams);
                while (sdr.Read())
                {
                    vmCollegeConfiguration.StudentApproval = Convert.ToBoolean(sdr["StudentApproval"]);
                }
                return Json(vmCollegeConfiguration, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
    }
    }
