package com.ws;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.net.MalformedURLException;
import java.net.URL;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;

import org.json.simple.JSONObject;

@Path("generic")
public class SolrWebService {
    @SuppressWarnings("unused")
    @Context
    private UriInfo context;

    /**
     * Default constructor. 
     */
    public SolrWebService() {
        // TODO Auto-generated constructor stub
    }

    /**
     * Retrieves representation of an instance of SolrWebService
     * @return an instance of String
     */
    @GET
    @Produces("application/x-javascript")
    @Path("converTxt2JSON/{txtfile:.+}/and/{jsonfile:.+}")
    public String converTxt2JSON(@QueryParam("callback") String callback,@PathParam("txtfile") String txtfile,@PathParam("jsonfile") String jsonfile){
         
		BufferedReader br = null;
		
		String result = "";
		
		int count=0;
 
		try {
 
			String sCurrentLine;
			
 
			br = new BufferedReader(new FileReader(txtfile));
			
			FileWriter file = new FileWriter(jsonfile,true);
			
			file.write("[{");
 
			file.write("\"id\":\"Tweet\"");
			
			while ((sCurrentLine = br.readLine()) != null) {
				
				if(sCurrentLine.contains("\t")){
					String Array[] = sCurrentLine.split("\t");
					String tweetTrack = Array[0];
					String num = Array[1];
					String Array2[]=tweetTrack.split(": ");
			
							
					
					try {
						 
			
							
					
						if(count>0&&count<=10)
						{
							file.write(",\"title\":"+"\""+Array2[1]+"\"");	
						}
						if(count>10)
						{
							break;
						}
						
					
				 
					} catch (IOException e) {
						
						e.printStackTrace();
						result = e.toString();
					}
				//System.out.println(sCurrentLine);
				}
				
				count=count+1;
			}
			
			
			
			file.write("}]");
			file.flush();
			file.close();
			result  ="convert success";
		
		} catch (IOException e) {
			e.printStackTrace();
			result = e.toString();
		} finally {
			try {
				if (br != null)br.close();
			} catch (IOException ex) {
				ex.printStackTrace();
				result = ex.toString();
			}
		}
    
		
		return result;
    }
    
    
    
    @GET
    @Produces("application/x-javascript")
    @Path("uploadJson2Solr/{jsonfile:.+}")
    public String uploadJson2Solr(@QueryParam("callback") String callback,@PathParam("jsonfile") String jsonfile){
        
    	  String line="";
      	
      	try
      	{
      	// Process process = Runtime.getRuntime().exec ("pwd");
      		Process process = Runtime.getRuntime().exec ("curl http://134.193.136.127:8983/solr/collection1_shard1_replica1/update/json?overwrite=false --data-binary @"+jsonfile+" -H Content-type:application/json");
      	//	Process process = Runtime.getRuntime().exec ("curl www.google.com");
      		InputStreamReader ir=new InputStreamReader(process.getInputStream());
      	 LineNumberReader input = new LineNumberReader (ir);
      	 
      	 while ((line = input.readLine ()) != null){
      	  System.out.println(line);
      	   line = line+"\n";
      	   return line;  	 
      	}
      	
      	}
      	catch (java.io.IOException e){
      	 System.err.println ("IOException " + e.getMessage());
      	 return "IOException " + e.getMessage();
      	}
      	
      	return line;   	
    }

    /**
     * PUT method for updating or creating an instance of SolrWebService
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }

}