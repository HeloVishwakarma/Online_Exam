using DAL;
using OnlineExam.Areas.Admin.ViewModel;
using OnlineExam.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;

namespace OnlineExam.Areas.Admin.Controllers
{
    [SessionActionFilters]
    public class ExamController : Controller
    {
        SqlHelper objSQLHelper = new SqlHelper();
        // GET: Admin/Exam
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetExamData()
        {
            try
            {
                SqlParameter[] objParams = new SqlParameter[1];
                SqlDataReader sdr;
                objParams[0] = new SqlParameter("@ExamId", 0);
                sdr = objSQLHelper.ExecuteReaderSP("[UspGetExam]", objParams);
                List<VmExam> ProductData = new List<VmExam>();
                while (sdr.Read())
                {
                    ProductData.Add(new VmExam()
                    {
                        ExamId = Convert.ToInt32(sdr["ExamId"]),
                        Exam = Convert.ToString(sdr["Exam"]),
                        StartDate = Convert.ToString(sdr["StartDate"]),
                        EndDate = Convert.ToString(sdr["EndDate"]),
                        Starttime = Convert.ToString(sdr["Starttime"]),
                        Endtime = Convert.ToString(sdr["Endtime"]),
                        IsActive = Convert.ToBoolean(sdr["IsActive"])
                    });
                }
                return Json(new { data = ProductData }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        public JsonResult ExamSaveUpdate(VmExam ObjBC)
        {
            object ret = 0;
            try
            {
                SqlParameter[] objParams = null;
                objParams = new SqlParameter[9];
                objParams[0] = new SqlParameter("@ExamId", ObjBC.ExamId);
                objParams[1] = new SqlParameter("@Exam", ObjBC.Exam);
                objParams[2] = new SqlParameter("@IsActive", ObjBC.IsActive);
                objParams[3] = new SqlParameter("@CreateBy", 1);
                objParams[4] = new SqlParameter("@StartDate", ObjBC.StartDate);
                objParams[5] = new SqlParameter("@EndDate", ObjBC.EndDate);
                objParams[6] = new SqlParameter("@Starttime", ObjBC.Starttime);
                objParams[7] = new SqlParameter("@Endtime", ObjBC.Endtime);
                objParams[8] = new SqlParameter("@R_Out", SqlDbType.Int);
                objParams[8].Direction = ParameterDirection.Output;
                ret = objSQLHelper.ExecuteNonQuerySP("UspInsertUpdateExam", objParams, true);
            }
            catch (Exception ex)
            {
                ret = -99;
                return Json(ex);
            }
            return Json(ret);
        }

        public JsonResult GetDataById(int Id)
        {
            try
            {
                SqlDataReader sdr;
                VmExam vmExam = new VmExam();
                SqlParameter[] objParams = new SqlParameter[1];
                objParams[0] = new SqlParameter("@ExamId", Id);

                sdr = objSQLHelper.ExecuteReaderSP("UspGetExam", objParams);
                while (sdr.Read())
                {
                    vmExam.ExamId = Convert.ToInt32(sdr["ExamId"]);
                    vmExam.Exam = Convert.ToString(sdr["Exam"]);
                    vmExam.StartDate = Convert.ToString(sdr["StartDate"]);
                    vmExam.EndDate = Convert.ToString(sdr["EndDate"]);
                    vmExam.Starttime = Convert.ToString(sdr["Starttime"]);
                    vmExam.Endtime = Convert.ToString(sdr["Endtime"]);
                    vmExam.IsActive = Convert.ToBoolean(sdr["IsActive"]);
                }
                return Json(vmExam);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
    }
}