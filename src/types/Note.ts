
export interface Attributes {
  id?: string
  class?: string
  style?: string
  src?: string
  width?: string
  height?: string
}

export interface InlineNode {
  type: string
  text?: string
  attributes?: Attributes
  children?: InlineNode[]
}

export interface Block {
  type: string
  attributes?: Attributes
  children?: InlineNode[]
  data?: LawCard;
}

export interface Line {
  line_type: string,
  attributes?: Attributes,
  children?: InlineNode,
}

export interface LawCard {
  chapter: string,
  num: string,
  lines: Line[]
}

export interface Note {
  id: string
  content: Block[] | null
  user_name: string
  directory: string
  file_name: string
  footer: string | null
}

export async function get_every_note(ApiLink: string): Promise<null | Note[]> {
  let list = null;
  try {
    let response = await fetch(`${ApiLink}/every_notes`, {
      method: 'GET',
    });
    list = await response.json() as Note[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error: " + error.message);
    } else {
      // 如果錯誤不是 Error 對象，處理其他類型的錯誤或記錄通用錯誤信息
      console.log("Error: ", error);
    }
  }
  return list
}

export async function get_note_list(ApiLink: string, writer: string, folder: string): Promise<null | string[]> {
  let list = null;
  try {
    let response = await fetch(`${ApiLink}/note_list/${writer}/${folder}`, {
      method: 'GET',
    });
    list = await response.json() as string[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error: " + error.message);
    } else {
      // 如果錯誤不是 Error 對象，處理其他類型的錯誤或記錄通用錯誤信息
      console.log("Error: ", error);
    }
  }
  return list
}

export async function get_note(ApiLink: string, userName: string, folderName: string, noteName: string): Promise<null | Note> {
  try {
    const response = await fetch(`${ApiLink}/note/${userName}-${folderName}-${noteName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    };
    const fetchedNote: Note = await response.json();
    return fetchedNote
  } catch (error) {
    console.error('Failed to load note:', error)
    return null
  }
}

export interface H2Nav {
  id: string,
  text: string,
  children?: H3Nav[],
}

export interface H3Nav {
  id: string,
  text: string,
}

export type UpdateContent = {
  content: string,
}

export async function get_every_note(ApiLink: string): Promise<null | Note[]> {
  let list = null;
  try {
    let response = await fetch(`${ApiLink}/every_notes`, {
      method: 'GET',
    });
    list = await response.json() as Note[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error: " + error.message);
    } else {
      // 如果錯誤不是 Error 對象，處理其他類型的錯誤或記錄通用錯誤信息
      console.log("Error: ", error);
    }
  }
  return list
}

export async function get_note_list(ApiLink: string, writer: string, folder: string): Promise<null | string[]> {
  let list = null;
  try {
    let response = await fetch(`${ApiLink}/note_list/${writer}/${folder}`, {
      method: 'GET',
    });
    list = await response.json() as string[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error: " + error.message);
    } else {
      // 如果錯誤不是 Error 對象，處理其他類型的錯誤或記錄通用錯誤信息
      console.log("Error: ", error);
    }
  }
  return list
}

export async function get_note(ApiLink: string, userName: string, folderName: string, noteName: string): Promise<null | Note> {
  try {
    const response = await fetch(`${ApiLink}/note/${userName}-${folderName}-${noteName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    };
    const fetchedNote: Note = await response.json();
    return fetchedNote
  } catch (error) {
    console.error('Failed to load note:', error)
    return null
  }
}

export interface H2Nav {
  id: string,
  text: string,
  children?: H3Nav[],
}

export interface H3Nav {
  id: string,
  text: string,
}

export type UpdateContent = {
  content: string,
}

export async function get_note_nav(ApiLink: string, id: string): Promise<null | H2Nav[]> {
  try {
    const response = await fetch(`${ApiLink}/note_nav/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data as H2Nav[];
  } catch (error) {
    console.error('Failed to load note:', error)
    return null
  }
}

export async function create_note(ApiLink: string, note: Note) {
  try {
    let res = await fetch(`${ApiLink}/note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    if (res.ok) {
      alert("加入成功");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      // 現在 TypeScript 知道這是一個 Error 對象，可以安全地訪問 .message 屬性
      console.log("Error: " + error.message);
    } else {
      // 如果錯誤不是 Error 對象，處理其他類型的錯誤或記錄通用錯誤信息

      console.log("Error: ", error);
    }
  }
}

