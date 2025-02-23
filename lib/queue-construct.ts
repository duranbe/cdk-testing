import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from "constructs";

export class DeadLetterQueue extends sqs.Queue {
    public readonly messagesInQueueAlarm: cloudwatch.IAlarm;
  
    constructor(scope: Construct, id: string) {
      super(scope, id);
  
      // Add the alarm
      this.messagesInQueueAlarm = new cloudwatch.Alarm(this, 'Alarm', {
        alarmDescription: 'There are messages in the Dead Letter Queue',
        evaluationPeriods: 1,
        threshold: 1,
        metric: this.metricApproximateNumberOfMessagesVisible(),
      });
    }
  }