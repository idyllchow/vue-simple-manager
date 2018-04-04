import Mock from 'mockjs';

const HistoryDeploys = [];

for (let i = 0; i < 80; i++) {
	HistoryDeploys.push(Mock.mock({
		id: Mock.Random.guid(),
		appName: Mock.Random.pick(['实地通', '应用2']),
	    platform: Mock.Random.pick(['Android', 'iOS']),

	    
	    version: Mock.Random.increment(100),
	    // version: Mock.mock({"string|1-100.1-10": 1}),
	    upgradeType: Mock.Random.pick(['强制更新', '非强制更新']),
	    dateTime: Mock.Random.datetime(),
	    changelog:  Mock.mock('@ctitle(15)')
	}));
}

export { HistoryDeploys }