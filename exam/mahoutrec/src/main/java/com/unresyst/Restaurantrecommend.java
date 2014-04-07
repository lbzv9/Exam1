package com.unresyst;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.List;
import java.io.IOException;

import org.apache.commons.cli2.OptionException; 
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.model.file.FileDataModel;
import org.apache.mahout.cf.taste.impl.recommender.CachingRecommender;
import org.apache.mahout.cf.taste.impl.recommender.slopeone.SlopeOneRecommender;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.impl.common.LongPrimitiveIterator;

public class Restaurantrecommend {
    
    public static void main(String[] args) throws FileNotFoundException, TasteException, IOException {
        
        // create data source (model) - from the csv file            
        File inputFile = new File("data/restaurants.csv");                        
        DataModel dm = new FileDataModel(inputFile);
        
        // create a simple recommender on our data
        CachingRecommender cr = new CachingRecommender(new SlopeOneRecommender(dm));

        // for all users
        for (LongPrimitiveIterator a = dm.getUserIDs(); a.hasNext();){
            long uid = a.nextLong();
            
            // get the recommendations for the user
            List<RecommendedItem> rec = cr.recommend(uid, 15);
            
            // if empty write something
            if (rec.size() == 0){
                System.out.print("User ");
                System.out.print(uid);
                System.out.println(": no recommendations");
            }
                            
            // print the list of recommendations for each 
            for (RecommendedItem restId : rec) {
                System.out.print("User ");
                System.out.print(uid);
                System.out.print(": ");
                System.out.println(restId);
            }
        }        
    }
}
