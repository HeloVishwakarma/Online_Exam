using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DAL;
using OnlineExam.Areas.Admin.ViewModel;
using OnlineExam.Helper;
using System.Globalization;
using Newtonsoft.Json;
using OnlineExam.Common;

namespace OnlineExam.Areas.Admin.Controllers
{
    [SessionActionFilters]
    public class ExamQuestionController : Controller
    {
        SqlHelper objSQLHelper = new SqlHelper();
        // GET: Admin/ExamQuestion
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetBindQuestionList()
        {

            try
            {
                SqlParameter[] objParams = new SqlParameter[1];
                objParams[0] = new SqlParameter("@CommandType", "QuestionType");
                SqlDataReader sdr = objSQLHelper.ExecuteReaderSP("BindDropDownList", objParams);
                List<VmExamQuestion> vmExamQuestion = new List<VmExamQuestion>();
                while (sdr.Read())
                {
                    vmExamQuestion.Add(new VmExamQuestion()
                    {
                        QuestionTypeId = Convert.ToInt32(sdr["QuestionTypeId"]),
                        QuestionTypeName = sdr["QuestionTypeName"].ToString()
                    });
                }
                return Json(vmExamQuestion);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        public List<VMQuestionDefinition> GetQuestionList(int id, int ExamId, int ExamNameId)
        {
            List<VMQuestionDefinition> questionTypes = new List<VMQuestionDefinition>();
            try
            {

                SqlParameter[] par = new SqlParameter[4];
                par[0] = new SqlParameter("@QuestionTypeSerialNo", id);
                par[1] = new SqlParameter("@FeedBackQuestionsId", id);
                par[2] = new SqlParameter("@ExamId", ExamId);
                par[3] = new SqlParameter("@ExamNameId", ExamNameId);
                DataSet ds = objSQLHelper.ExecuteDataSetSP("[dbo].[UspGetFeedbackQuestionData]", par);
                if (ds != null)
                {
                    questionTypes = TableToList.ConvertDataTable<VMQuestionDefinition>(ds.Tables[0]);
                }
            }
            catch (Exception ex)
            {
                
            }
            return questionTypes;
        }

        public int AddUpdateQuestionData(VMQuestionDefinitionPost vmQuestionDefinitionPost)
        {
            try
            {

                DataTable docTable = null;
                DataTable dt = null;
                if (vmQuestionDefinitionPost.questionOptions != null)
                {
                    string docJson = JsonConvert.SerializeObject(vmQuestionDefinitionPost.questionOptions);
                    docTable = JsonConvert.DeserializeObject<DataTable>(docJson);
                }
                //if (vmQuestionDefinitionPost.CourseIds != null)
                //{
                //    string json = JsonConvert.SerializeObject(vmQuestionDefinitionPost.CourseIds);
                //    dt = JsonConvert.DeserializeObject<DataTable>(json);
                //    dt.Columns.Remove("CourseName");
                //}

                SqlParameter[] objParams = null;
                objParams = new SqlParameter[15];

                objParams[0] = new SqlParameter("@FeedBackQuestionsId", vmQuestionDefinitionPost.FeedBackQuestionsId);
                objParams[1] = new SqlParameter("@QuestionTypeSerialNo", vmQuestionDefinitionPost.QuestionsTypeId);
                objParams[2] = new SqlParameter("@Questions", vmQuestionDefinitionPost.Questions);
                objParams[3] = new SqlParameter("@SerialNumber", vmQuestionDefinitionPost.SerialNumber);
                objParams[4] = new SqlParameter("@MaxOptionSelection", vmQuestionDefinitionPost.MaxOptionSelection);
                objParams[5] = new SqlParameter("@IsCompulsary", vmQuestionDefinitionPost.IsCompulsary);
                objParams[6] = new SqlParameter("@OptionTable", docTable);
                objParams[7] = new SqlParameter("@IsActive", vmQuestionDefinitionPost.IsActive);
                objParams[8] = new SqlParameter("@CollegeId", vmQuestionDefinitionPost.CollegeId);
                objParams[9] = new SqlParameter("@UserId", vmQuestionDefinitionPost.UserId);
                objParams[10] = new SqlParameter("@IPAddress", vmQuestionDefinitionPost.IPAddress);
                objParams[11] = new SqlParameter("@MACAddress", vmQuestionDefinitionPost.MACAddress);
                objParams[12] = new SqlParameter("@CourseId", dt);
                objParams[13] = new SqlParameter("@CourseLevelId", vmQuestionDefinitionPost.CourselevelId);
                objParams[14] = new SqlParameter("@R_Out", SqlDbType.Int);
                objParams[14].Direction = ParameterDirection.Output;

                object ret = objSQLHelper.ExecuteNonQuerySP("[dbo].[UspInsertUpdateFeedBackQuestionsAndOptions]", objParams, true);

                if (ret != null)
                {
                    return (int)ret;
                }
                else
                {
                    return -99;
                }

            }
            catch (Exception ex)
            {
                return -99;
            }
        }
    }
}