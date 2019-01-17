const CacheManager = require('cache-manager');
const fsStore = require('../libs/cache-manager-fs');//custom class forked from  https://github.com/hotelde/node-cache-manager-fs
const MemoryCache = CacheManager.caching({store: 'memory', max: 5000, ttl: 86400/*seconds*/});
const DiskCache = CacheManager.caching({store: fsStore, options: {path:'diskcache', preventfill:false, ttl: 86400/*seconds*/}});

module.exports.MemoryCache = MemoryCache;
module.exports.DiskCache = DiskCache;
module.exports.MultiCaching = CacheManager.multiCaching([MemoryCache, DiskCache]);

module.exports.reset = function(keyword, cb){
	MemoryCache.reset(function()
	{
		DiskCache.reset(keyword, cb);
	});
};