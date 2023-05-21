using OnlineExam.Areas.Admin.ViewModel;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DAL;
using OnlineExam.Common;

namespace OnlineExam.Areas.Admin.Controllers
{
    [SessionActionFilters]
    public class ExamTypeController : Controller
    {
        SqlHelper objSQLHelper = new SqlHelper();
        // GET: Admin/ExamType
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
        public JsonResult GetBindExamTypeList(int Id)
        {

            try
            {
                SqlParameter[] objParams = new SqlParameter[2];
                objParams[0] = new SqlParameter("@CommandType", "ExamName");
                objParams[1] = new SqlParameter("@ExamId",Id);
                SqlDataReader sdr = objSQLHelper.ExecuteReaderSP("BindDropDownList", objParams);
                List<VmExam> ExamList = new List<VmExam>();
                while (sdr.Read())
                {
                    ExamList.Add(new VmExam()
                    {
                        ExamNameId = Convert.ToInt32(sdr["ExamNameId"]),
                        ExamName = sdr["ExamName"].ToString()
                    });
                }
                return Json(ExamList);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        public JsonResult ExamTypeSaveUpdate(VmExam ObjBC)
        {
            object ret = 0;
            try
            {
                SqlParameter[] objParams = null;
                objParams = new SqlParameter[11];
                objParams[0] = new SqlParameter("@ExamId", ObjBC.ExamId);
                objParams[1] = new SqlParameter("@ExamNameId", ObjBC.ExamNameId);
                objParams[2] = new SqlParameter("@ExamTypeId", ObjBC.ExamTypeId);
                objParams[3] = new SqlParameter("@ExamType", ObjBC.ExamType);
                objParams[4] = new SqlParameter("@IsActive", ObjBC.IsActive);
                objParams[5] = new SqlParameter("@CreateBy", 1);
                objParams[6] = new SqlParameter("@StartDate", ObjBC.StartDate);
                objParams[7] = new SqlParameter("@EndDate", ObjBC.EndDate);
                objParams[8] = new SqlParameter("@Starttime", ObjBC.Starttime);
                objParams[9] = new SqlParameter("@Endtime", ObjBC.Endtime);
                objParams[10] = new SqlParameter("@R_Out", SqlDbType.Int);
                objParams[10].Direction = ParameterDirection.Output;
                ret = objSQLHelper.ExecuteNonQuerySP("[dbo].[UspInsertUpdateExamType]", objParams, true);
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
                objParams[0] = new SqlParameter("@ExamTypeId", Id);

                sdr = objSQLHelper.ExecuteReaderSP("UspGetExamType", objParams);
                while (sdr.Read())
                {

                    vmExam.ExamNameId = Convert.ToInt32(sdr["ExamNameId"]);
                    vmExam.ExamTypeId = Convert.ToInt32(sdr["ExamTypeId"]);
                    vmExam.ExamType = Convert.ToString(sdr["ExamType"]);
                    vmExam.ExamName = Convert.ToString(sdr["ExamName"]);
                    vmExam.ExamId = Convert.ToInt32(sdr["ExamId"]);
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
        public JsonResult GetExamTypeData(int ExamId, int ExamNameId)
        {
            try
            {
                SqlParameter[] objParams = new SqlParameter[2];
                SqlDataReader sdr;
                objParams[0] = new SqlParameter("@ExamId", ExamId);
                objParams[1] = new SqlParameter("@ExamNameId", ExamNameId);
                sdr = objSQLHelper.ExecuteReaderSP("[UspGetExamTypeList]", objParams);
                List<VmExam> ProductData = new List<VmExam>();
                while (sdr.Read())
                {
                    ProductData.Add(new VmExam()
                    { 
                        Exam = Convert.ToString(sdr["Exam"]),
                        ExamTypeId = Convert.ToInt32(sdr["ExamTypeId"]),
                        ExamType = Convert.ToString(sdr["ExamType"]),
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