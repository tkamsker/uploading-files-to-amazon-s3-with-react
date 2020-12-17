import s3PublicUrl from 'node-s3-public-url';
import { Meteor } from 'meteor/meteor';
import AWS from 'aws-sdk';

AWS.config = new AWS.Config();

AWS.config.accessKeyId = Meteor.settings.AWSAccessKeyId;
AWS.config.secretAccessKey = Meteor.settings.AWSSecretAccessKey;
// AWS.config.accessKeyId = "AKIAUZDEQSyyyBANON7KU47";
//AWS.config.secretAccessKey = "oKFJv9wRAyyyAL00XuXqQxxrwB+FyT56/K56ssJs82l";


const s3 = new AWS.S3();

export default {
  deleteFile(file, callback) {
    const sanitizedEmailAddress = encodeURIComponent(file.emailAddress);
    const sanitizedFileName = s3PublicUrl(file.fileName);
    const sanitizedUrl = file.url.replace(sanitizedEmailAddress, file.emailAddress).replace(sanitizedFileName, file.fileName);

    s3.deleteObject({
//      Bucket: 'tmc-react-s3',
//      Key: sanitizedUrl.replace('https://tmc-react-s3.s3-us-west-2.amazonaws.com/', ''),
      Bucket: Meteor.settings.bucket,
      Key: sanitizedUrl.replace('https://'+settings.bucket+'.'+settings.region+'.'+'aws.amazon.com/', ''),

    }, Meteor.bindEnvironment((error) => {
      if (error) console.warn(error);
      if (!error && callback) callback(file.url);
    }));
  },
};
