import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: AppStateType = {
    tags: [],
    selectedTag: {} as TagsType
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        addAllTags: (state, action: PayloadAction<TagsType[]>) => {
            state.tags.filter(t => {
                for (let i: number = 0; i < action.payload.length; i++) {
                    if (t.tag === action.payload[i].tag) {
                        action.payload.splice(i, 1)
                        return true
                    }
                    return false
            }})
            state.tags = [...state.tags, ...action.payload]
        },
        setSelectedTags: (state, action: PayloadAction<TagsType>) => {
            state.selectedTag = action.payload
        },
    },
})

export const {addAllTags, setSelectedTags} = appSlice.actions
export default appSlice.reducer

//types
type AppStateType = {
    tags: TagsType[]
    selectedTag: TagsType
}
export type TagsType = {
    id: string
    tag: string
}