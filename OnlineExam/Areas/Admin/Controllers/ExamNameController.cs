using DAL;
using OnlineExam.Areas.Admin.ViewModel;
using OnlineExam.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineExam.Areas.Admin.Controllers
{
    [SessionActionFilters]
    public class ExamNameController : Controller
    {
        SqlHelper objSQLHelper = new SqlHelper();
        // GET: Admin/ExamName
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetBindExamList()
        {

            try
            {
                SqlParameter[] objParams = new SqlParameter[1];
                objParams[0] = new SqlParameter("@CommandType", "Exam");
                SqlDataReader sdr = objSQLHelper.ExecuteReaderSP("BindDropDownList", objParams);
                List<VmExam> ExamList = new List<VmExam>();
                while (sdr.Read())
                {
                    ExamList.Add(new VmExam()
                    {
                        ExamId = Convert.ToInt32(sdr["ExamId"]),
                        Exam = sdr["Exam"].ToString()
                    });
                }
                return Json(ExamList);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        public JsonResult ExamNameSaveUpdate(VmExam ObjBC)
        {
            object ret = 0;
            try
            {
                SqlParameter[] objParams = null;
                objParams = new SqlParameter[10];
                objParams[0] = new SqlParameter("@ExamId", ObjBC.ExamId);
                objParams[1] = new SqlParameter("@ExamNameId", ObjBC.ExamNameId);
                objParams[2] = new SqlParameter("@ExamName", ObjBC.ExamName);
                objParams[3] = new SqlParameter("@IsActive", ObjBC.IsActive);
                objParams[4] = new SqlParameter("@CreateBy", 1);
                objParams[5] = new SqlParameter("@StartDate", ObjBC.StartDate);
                objParams[6] = new SqlParameter("@EndDate", ObjBC.EndDate);
                objParams[7] = new SqlParameter("@Starttime", ObjBC.Starttime);
                objParams[8] = new SqlParameter("@Endtime", ObjBC.Endtime);
                objParams[9] = new SqlParameter("@R_Out", SqlDbType.Int);
                objParams[9].Direction = ParameterDirection.Output;
                ret = objSQLHelper.ExecuteNonQuerySP("[dbo].[UspInsertUpdateExamName]", objParams, true);
            }
            catch (Exception ex)
            {
                ret = -99;
                return Json(ex);
            }
            return Json(ret);
        }
        public JsonResult GetDataByExamId(int Id)
        {
            try
            {
                SqlDataReader sdr;
                VmExam vmExam = new VmExam();
                SqlParameter[] objParams = new SqlParameter[1];
                objParams[0] = new SqlParameter("@ExamNameId", Id);

                sdr = objSQLHelper.ExecuteReaderSP("UspGetExamName", objParams);
                while (sdr.Read())
                {
                    vmExam.ExamId = Convert.ToInt32(sdr["ExamId"]);
                    vmExam.ExamNameId = Convert.ToInt32(sdr["ExamNameId"]);
                    vmExam.ExamName = Convert.ToString(sdr["ExamName"]);
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
        [HttpGet]
        public JsonResult GetExamNameData()
        {
            try
            {
                SqlParameter[] objParams = new SqlParameter[1];
                SqlDataReader sdr;
                objParams[0] = new SqlParameter("@ExamNameId", 0);
                sdr = objSQLHelper.ExecuteReaderSP("[UspGetExamName]", objParams);
                List<VmExam> ProductData = new List<VmExam>();
                while (sdr.Read())
                {
                    ProductData.Add(new VmExam()
                    {
                        ExamNameId = Convert.ToInt32(sdr["ExamNameId"]),
                        Exam = Convert.ToString(sdr["Exam"]),
                        ExamName = Convert.ToString(sdr["ExamName"]),
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
    }
}