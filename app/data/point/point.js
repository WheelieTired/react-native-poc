import PouchDB from 'pouchdb-react-native'

const db = new PouchDB('points');
const remotedb = new PouchDB('http://52.91.46.42:5984/points', {
    auth: {
    username: 'btc-admin',
    password: 'damsel-custard-tramway-ethanol'
    }
  });

export default class Point{


}

export function ReplicateFromDB(){

        PouchDB.replicate(remotedb, db).on('change', function (info) {
                                         // handle change
                                       }).on('paused', function (err) {
                                         // replication paused (e.g. replication up to date, user went offline)
                                       }).on('active', function () {
                                         // replicate resumed (e.g. new changes replicating, user went back online)
                                       }).on('denied', function (err) {
                                         // a document failed to replicate (e.g. due to permissions)
                                       }).on('complete', function (info) {
                                         console.log("points copied from db");
                                       }).on('error', function (err) {
                                         console.log(err.message);
                                       });

    }

    export function GetPoints(){
        //remotedb.get('point/service/missoula-bike-source/c2qft6jv7').then(doc => console.log(doc));
        //ReplicateFromDB();
        var allDocs = db.allDocs().then(function (result) {
                      var docs = result.rows.map(function (row) {
                            return row.doc.location;
                      });
                      //console.log(docs);
                      return docs;
                    }).catch(function (err) {
                      console.log(err);
                    });
        //console.log("alldocs",allDocs);
        return allDocs;
    }