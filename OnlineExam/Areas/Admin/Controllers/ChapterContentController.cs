using OnlineExam.Areas.Admin.ViewModel;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OnlineExam.Common;
using DAL;

namespace OnlineExam.Areas.Admin.Controllers
{
    [SessionActionFilters]
    public class ChapterContentController : Controller
    {
        // GET: Admin/ChapterContent
        SqlHelper objSQLHelper = new SqlHelper();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetBindChapterList()
        {

            try
            {
                SqlParameter[] objParams = new SqlParameter[1];
                objParams[0] = new SqlParameter("@CommandType", "Chapter");
                SqlDataReader sdr = objSQLHelper.ExecuteReaderSP("BindDropDownList", objParams);
                List<VmChapterContent> ChapterList = new List<VmChapterContent>();
                while (sdr.Read())
                {
                    ChapterList.Add(new VmChapterContent()
                    {
                        ChapterId = Convert.ToInt32(sdr["ChapterId"]),
                        ChapterName = sdr["ChapterName"].ToString()
                    });
                }
                return Json(ChapterList);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        public JsonResult ChapterNameSaveUpdate(VmChapterContent ObjBC)
        {
            object ret = 0;
            try
            {
                SqlParameter[] objParams = null;
                objParams = new SqlParameter[6];
                objParams[0] = new SqlParameter("@ChapterId", ObjBC.ChapterId);
                objParams[1] = new SqlParameter("@ChapterContentId", ObjBC.ChapterContentId);
                objParams[2] = new SqlParameter("@ChapterContent", ObjBC.ChapterContent);
                objParams[3] = new SqlParameter("@IsActive", ObjBC.IsActive);
                objParams[4] = new SqlParameter("@CreateBy", 1);
                objParams[5] = new SqlParameter("@R_Out", SqlDbType.Int);
                objParams[5].Direction = ParameterDirection.Output;
                ret = objSQLHelper.ExecuteNonQuerySP("[dbo].[UspInsertUpdateChapterContent]", objParams, true);
            }
            catch (Exception ex)
            {
                ret = -99;
                return Json(ex);
            }
            return Json(ret);
        }
        public JsonResult GetDataByChapterContentId(int Id)
        {
            try
            {
                SqlDataReader sdr;
                VmChapterContent vmChapterContent = new VmChapterContent();
                SqlParameter[] objParams = new SqlParameter[1];
                objParams[0] = new SqlParameter("@ChapterContentId", Id);

                sdr = objSQLHelper.ExecuteReaderSP("UspGetChapterName", objParams);
                while (sdr.Read())
                {
                    vmChapterContent.ChapterId = Convert.ToInt32(sdr["ChapterId"]);
                    vmChapterContent.ChapterContent = Convert.ToString(sdr["ChapterContent"]);
                    vmChapterContent.IsActive = Convert.ToBoolean(sdr["IsActive"]);
                }
                return Json(vmChapterContent);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        [HttpGet]
        public JsonResult GetChapterContent(int Id)
        {
            try
            {
                SqlParameter[] objParams = new SqlParameter[1];
                SqlDataReader sdr;
                objParams[0] = new SqlParameter("@ChapterId", Id);
                sdr = objSQLHelper.ExecuteReaderSP("[UspGetChapterContent]", objParams);
                List<VmChapterContent> ProductData = new List<VmChapterContent>();
                while (sdr.Read())
                {
                    ProductData.Add(new VmChapterContent()
                    {
                        ChapterContentId = Convert.ToInt32(sdr["ChapterContentId"]),
                        ChapterContent = Convert.ToString(sdr["ChapterContent"]),
                        ChapterName = Convert.ToString(sdr["ChapterName"]),
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