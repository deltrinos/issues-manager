import type { AWS } from '@serverless/typescript';
import functions from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'issues-manager',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', "serverless-offline", "serverless-offline-redis-server"],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: functions,
  package: { individually: true },
  custom: {
    redis: {
      port: 8888,
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
