using DAL;
using OnlineExam.Areas.Admin.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;

namespace OnlineExam.Areas.Admin.Controllers
{
    public class ChapterController : Controller
    {
        // GET: Admin/Chapter
        SqlHelper objSQLHelper = new SqlHelper();
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetChapterData()
        {
            try
            {
                SqlParameter[] objParams = new SqlParameter[1];
                SqlDataReader sdr;
                objParams[0] = new SqlParameter("@ChapterId", 0);
                sdr = objSQLHelper.ExecuteReaderSP("[UspGetChapter]", objParams);
                List<VmChapterContent> ChapterContent = new List<VmChapterContent>();
                while (sdr.Read())
                {
                    ChapterContent.Add(new VmChapterContent()
                    {
                        ChapterId = Convert.ToInt32(sdr["ChapterId"]),
                        ChapterName = Convert.ToString(sdr["ChapterName"]),
                        IsActive = Convert.ToBoolean(sdr["IsActive"])
                    });
                }
                return Json(new { data = ChapterContent }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        public JsonResult ChapterSaveUpdate(VmChapterContent ObjBC)
        {
            object ret = 0;
            try
            {
                SqlParameter[] objParams = null;
                objParams = new SqlParameter[5];
                objParams[0] = new SqlParameter("@ChapterId", ObjBC.ChapterId);
                objParams[1] = new SqlParameter("@ChapterName", ObjBC.ChapterName);
                objParams[2] = new SqlParameter("@IsActive", ObjBC.IsActive);
                objParams[3] = new SqlParameter("@CreateBy", 1);
                objParams[4] = new SqlParameter("@R_Out", SqlDbType.Int);
                objParams[4].Direction = ParameterDirection.Output;
                ret = objSQLHelper.ExecuteNonQuerySP("UspInsertUpdateChapter", objParams, true);
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
                VmChapterContent vmChapter = new VmChapterContent();
                SqlParameter[] objParams = new SqlParameter[1];
                objParams[0] = new SqlParameter("@ChapterId", Id);

                sdr = objSQLHelper.ExecuteReaderSP("UspGetChapter", objParams);
                while (sdr.Read())
                {
                    vmChapter.ChapterId = Convert.ToInt32(sdr["ChapterId"]);
                    vmChapter.ChapterName = Convert.ToString(sdr["ChapterName"]);
                    vmChapter.IsActive = Convert.ToBoolean(sdr["IsActive"]);
                }
                return Json(vmChapter);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
    }
}