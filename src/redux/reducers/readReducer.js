

const initState = {read:false} //初始化状态
export default function readReducer(state=initState,action){
	//从action对象中获取：type
	const {type} = action
	//根据type决定如何加工数据
	switch (type) {
		case 'isRead':
			return {read:true}
		default:
			return state
	}
}