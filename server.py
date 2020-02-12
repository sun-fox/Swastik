from flask import Flask, request, render_template
# from flask_restful import Resource, Api
from flask import jsonify
from flask_cors import CORS
import pandas 
import numpy as np
import sys, pickle
from io import StringIO
io=StringIO()

app = Flask(__name__, template_folder='views')
# api = Api(app)
CORS(app)
@app.route("/")
def hello():
    return ({"data":"Welcome to machine learning model APIs!"});

@app.route('/train')
@app.route("/predict", methods=['POST'])
def index():
    dataset = request.get_json()
    # df = pandas.read_csv('p.csv')
    # df['Year'] = pandas.DatetimeIndex(df['DATE']).year
    # df['Month'] = pandas.DatetimeIndex(df['DATE']).month
    # df.drop(['DATE'],axis=1,inplace=True)
    # dic={'855108':0,'855138':0,'855198':0,'855008':0,'852108':0,'855238':0,'855108':0,'855128':0,'825108':0,'854108':0}
    # for i in range(len(df)) : 
    #     dic[str(df.iloc[i,0])]=0
    # for i in range(len(df)) : 
    #     dic[str(df.iloc[i,0])]+=1
    # arr =np.array((10,6,4,2));
    # computed = []
    # Disease=["Diabetes","Cancer","Tuberculosis","Diarrhoea","AIDS"," STROKE"]
    # Year = ['2019','2020']
    # Month = ['1','2','3','4','5','6','7','8','9','10','11','12']
    # pincode=["855108","853108","854108","855128","852108","825108","855138","855238","855198","855008"]
    # for pin in pincode:
    #     for ds in Disease:
    #         for sn in Month:
    #             for yr in Year:
    #                 count = 0;
    #                 for i in range(len(df)) : 
    #                     if (str(df.iloc[i,0]) == str(pin) and str(df.iloc[i,3]) == str(ds) and str(df.iloc[i,6]) == str(sn) and str(df.iloc[i,5]) == str(yr)):
    #                         count+=1
    #                 percent_infect = (count/dic[pin]*50)
    #                 computed.append({(pin,ds,sn,yr):percent_infect})


    # import pandas as pd
    # df = pd.DataFrame()
    # pincode = []
    # disease = []
    # month = []
    # year = []
    # per = []
    # for d in computed:
    #     for i,v in d.items():
    #         pincode.append(i[0])
    #         disease.append(i[1])
    #         month.append(i[2])
    #         year.append(i[3])
    #         per.append(v)
    # df['pincode'] = pincode
    # df['disease'] = disease
    # df['month'] = month
    # df['year'] = year
    # df['percent_effect'] = per

    # dataframe =df
    # Y_train = dataframe["percent_effect"]
    # X_train = dataframe.drop(["percent_effect"],axis=1)
    from sklearn.preprocessing import LabelEncoder
    le=LabelEncoder()
    # X_train["disease"]=le.fit_transform(X_train["disease"])
    # from sklearn.ensemble import RandomForestRegressor
    # random_forest = RandomForestRegressor(n_estimators=100, criterion='mse',
    #                                 max_depth=None, min_samples_split=2, min_samples_leaf=1,
    #                                 min_weight_fraction_leaf=0.0, max_features='auto', max_leaf_nodes=None,
    #                                 min_impurity_decrease=0.0, min_impurity_split=None, bootstrap=True, 
    #                                 oob_score=False, n_jobs=None, random_state=None, verbose=0, warm_start=False)
    # model = random_forest.fit(X_train, Y_train)

    # pickle.dump('model.pkl', model)
    model =pickle.load(open('model.pkl','rb'))
    dfx = pandas.read_csv("X_test.csv")
    # test["disease"]=le.fit_transform(test["disease"])
    # Y_prediction = model.predict(test)
    # arr=[]
    # j=0
    # for i in Y_prediction:
    #     j+=1
    #     if i > 0.1:
    #         arr.append(test.iloc[j])
    # print(arr)
    # print(arr[0].pincode)
    # le=LabelEncoder()
    dfx["disease"]=le.fit_transform(dfx["disease"])
    dfx["month"]=le.fit_transform(dfx["month"])
    dict_d={
        0:"Cholera",
        1:"Malaria",
        2:"Leptospirosis",
        3:"Diarrhoea",
        4:"Diphtheria",
        5:"Dengu"
    }
    dict_m={
        0:"January",
        1:"February",
        2:"March",
        3:"April",
        4:"May",
        5:"June",
        6:"July",
        7:"August",
        8:"September",
        9:"October",
        10:"November",
        11:"December"
    }
    Y_prediction = model.predict(dfx)
    dfx['disease']=dfx['disease'].replace(dict_d)
    dfx['month']=dfx['month'].replace(dict_m)

    
    arr=[]
    j=0
    for i in Y_prediction:
        j+=1
        if i > 0.1:
            arr.append(dfx.iloc[j])
    print(arr)
    # print(type(arr))
    return render_template('epidemic.html', data=arr)
    # return render_template("views/epidemic.html")
    # return jsonify({'predict':'eiufhe'})
    # file_path = "/path.json" ## your path variable
    # json.dump(Y_prediction, codecs.open(file_path, 'w', encoding='utf-8'), separators=(',', ':'),io) ### this saves the array in .json format
    # x = io.getvalue()
    # return arr.tolist()


if __name__ == '__main__':
    app.run(debug =True, host='0.0.0.0', port=5000)


