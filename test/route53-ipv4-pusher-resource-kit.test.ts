import {matchTemplate, MatchStyle, SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Route53Ipv4PusherResourceKit from '../lib/route53-ipv4-pusher-resource-kit-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Route53Ipv4PusherResourceKit.Route53Ipv4PusherResourceKitStack(app, 'MyTestStack');
    // THEN

    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
    // expectCDK(stack).to(matchTemplate({
    //   "Resources": {
    //
    //   }
    // }, MatchStyle.EXACT))
});
