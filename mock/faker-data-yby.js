const faker = require('faker');
const _ = require('lodash');

faker.locale = 'zh_CN';
module.exports = {
    // 点位
    list: {
        code: '0',
        type: 0,
        msg: '成功！',
        data: _.times(20, index => ({
            indexCode: `indexCode${index}`,
            name: `相机名称${index}`
        }))
    },
    tree: {
        code: '0',
        msg: 'success',
        data: {
            type: 0,
            code: '0',
            msg: 'SUCCESS',
            data: [
                {
                    indexCode: '9400737abd784883b822689c32c29953',
                    name: '莲都区',
                    parentIndexCode: 'ac39b69d3c3047ff8ea5c062abd7e47e',
                    available: false,
                    leaf: true,
                    cascadeCode: '0',
                    cascadeType: 0,
                    orgType: 0,
                    externalIndexCode: '331102',
                    parentExternalIndexCode: '3311',
                    treePath: '@ac39b69d3c3047ff8ea5c062abd7e47e@9400737abd784883b822689c32c29953@',
                    sort: 2,
                    localQuantity: 2
                },
                {
                    indexCode: '3ad39ee66c874fa2baf24b24e9dc1be8',
                    name: '青田县',
                    parentIndexCode: 'ac39b69d3c3047ff8ea5c062abd7e47e',
                    available: false,
                    leaf: true,
                    cascadeCode: '0',
                    cascadeType: 0,
                    orgType: 0,
                    externalIndexCode: '331121',
                    parentExternalIndexCode: '3311',
                    treePath: '@ac39b69d3c3047ff8ea5c062abd7e47e@3ad39ee66c874fa2baf24b24e9dc1be8@',
                    sort: 4,
                    localQuantity: 4
                },
                {
                    indexCode: 'e3d186a180854bd3837dbbf614d1521b',
                    name: '缙云县',
                    parentIndexCode: 'ac39b69d3c3047ff8ea5c062abd7e47e',
                    available: false,
                    leaf: true,
                    cascadeCode: '0',
                    cascadeType: 0,
                    orgType: 0,
                    externalIndexCode: '331122',
                    parentExternalIndexCode: '3311',
                    treePath: '@ac39b69d3c3047ff8ea5c062abd7e47e@e3d186a180854bd3837dbbf614d1521b@',
                    sort: 5,
                    localQuantity: 3
                },
                {
                    indexCode: 'bd4450abc1db4d43bd38abb13d00bab7',
                    name: '舟山市',
                    parentIndexCode: 'ac39b69d3c3047ff8ea5c062abd7e47e',
                    available: false,
                    leaf: false,
                    cascadeCode: '0',
                    cascadeType: 0,
                    orgType: 9,
                    externalIndexCode: '33110000002160000002',
                    parentExternalIndexCode: '3311',
                    treePath: '@ac39b69d3c3047ff8ea5c062abd7e47e@bd4450abc1db4d43bd38abb13d00bab7@',
                    sort: 6,
                    localQuantity: 0
                }
            ]
        },
        success: true
    },
    findByOrgIndexCode: {
        code: '0',
        type: 0,
        msg: '成功！',
        data: _.times(20, index => ({
            indexCode: `indexCode${index}`,
            name: `相机名称${index}`,
            leaf: false
        }))
    }
};
