using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class SqlHelper
    {
        // ---- * FileMovement Module End *
        // ----------
        public object ExecuteNonQuerySP(String query, SqlParameter[] parameters, bool flag)
        {
            object retval = null;
            using (SqlConnection cnn = new SqlConnection(Getcon()))
            {
                using (SqlCommand cmd = new SqlCommand(query, cnn))
                {
                    cmd.CommandTimeout = 2000;
                    if (query.StartsWith("INSERT") | query.StartsWith("insert") | query.StartsWith("UPDATE") | query.StartsWith("update") | query.StartsWith("DELETE") | query.StartsWith("delete"))
                        cmd.CommandType = CommandType.Text;
                    else
                        cmd.CommandType = CommandType.StoredProcedure;

                    int i;
                    for (i = 0; i < parameters.Length; i++)
                        cmd.Parameters.Add(parameters[i]);

                    try
                    {
                        cnn.Open();
                        retval = cmd.ExecuteNonQuery();

                        if (flag == true)
                            retval = cmd.Parameters[parameters.Length - 1].Value;
                    }
                    catch (Exception ex)
                    {
                        retval = null;
                    }
                    finally
                    {
                        if (cnn.State == ConnectionState.Open) cnn.Close();
                    }
                }
            }
            return retval;
        }
        public DataSet ExecuteDataSetSP(String query, SqlParameter[] parameters)
        {
            DataSet ds = null;
            try
            {
                using (SqlConnection cnn = new SqlConnection(Getcon()))
                {
                    //SqlConnection cnn = new SqlConnection(Getcon());
                    using (SqlCommand cmd = new SqlCommand(query, cnn))
                    {
                        if (query.StartsWith("SELECT") | query.StartsWith("select") | query.StartsWith("INSERT") | query.StartsWith("insert") | query.StartsWith("UPDATE") | query.StartsWith("update") | query.StartsWith("DELETE") | query.StartsWith("delete"))
                            cmd.CommandType = CommandType.Text;
                        else
                            cmd.CommandType = CommandType.StoredProcedure;

                        int i;
                        for (i = 0; i < parameters.Length; i++)
                            cmd.Parameters.Add(parameters[i]);
                        cnn.Open();
                        SqlDataAdapter da = new SqlDataAdapter();
                        da.SelectCommand = cmd;
                        cmd.CommandTimeout = 180;
                        ds = new DataSet();
                        da.Fill(ds);
                    }
                }

            }
            catch (Exception ex)
            {
                ds = null;

            }
            return ds;
        }
        public SqlDataReader ExecuteReaderSP(String query, SqlParameter[] parameters)
        {
            SqlDataReader dr = null;
            try
            {
                SqlConnection cnn = new SqlConnection(Getcon());
                SqlCommand cmd = new SqlCommand(query, cnn);
                if (query.StartsWith("SELECT") | query.StartsWith("select"))
                    cmd.CommandType = CommandType.Text;
                else
                    cmd.CommandType = CommandType.StoredProcedure;

                int i;
                for (i = 0; i < parameters.Length; i++)
                    cmd.Parameters.Add(parameters[i]);

                cnn.Open();
                cmd.CommandTimeout = 180;
                dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            }
            catch (Exception ex)
            {
                dr = null;

            }
            return dr;
        }
        public string Getcon()
        {
            //Developement
            return "Server=DESKTOP-70QAQ56\\SQLEXPRESS;Database=OnlineExam;User Id=vishwakarma;Password=Password;";

            // return "Data Source=SQL5059.site4now.net;Initial Catalog=db_a4f7a7_neportal;User Id=db_a4f7a7_neportal_admin;Password=NEPortal@2023;";
        }
    }
}
