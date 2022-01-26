# Pythono3 code to rename multiple 
# files in a directory or folder
  
import os, sys, re
  

def snake_to_camel(inputstring):
  REG = r"(.*?)_([a-zA-Z])"
  def patternrepl(match):
    return match.group(1).lower() + match.group(2).upper()
  results = re.sub(REG, patternrepl, inputstring, 0)
  return results

def get_dirs_and_files_in_dir(iterator, fileExtension):
  dirs = []
  typescriptfiles = []
  for entry in iterator:
    if (entry.is_dir()):
      dirs.append(entry.name)
    if (entry.is_file() and entry.name.endswith(fileExtension)):
      typescriptfiles.append(entry.name)
  return dirs, typescriptfiles

def change_case(mypath, fileExtension, case_change_fn):
  files_changed = {}
  if os.path.isabs(mypath):
    raise ValueError
  else:
    abs_path_to_dir = os.path.normpath(os.path.join(os.path.dirname(__file__), mypath))
    with os.scandir(abs_path_to_dir) as iter:
      dirs, typescriptfiles = get_dirs_and_files_in_dir(iter, fileExtension)
      if len(dirs) != 0:
        for dir in dirs:
          files_changed.update(change_case(os.path.normpath(os.path.join(mypath,dir)), fileExtension, case_change_fn))
      for entry in typescriptfiles:
        relative_path = os.path.normpath(os.path.join(mypath,entry))
        dst = case_change_fn(relative_path)
        files_changed[entry.replace('.ts', '')] = case_change_fn(entry).replace('.ts', '')
        abs_path = os.path.normpath(os.path.join(os.path.dirname(__file__), relative_path))
        abs_dst = os.path.normpath(os.path.join(os.path.dirname(__file__), dst))
        (head, tail) = os.path.split(abs_dst)  # @UnusedVariable
        if not os.path.exists(head):
          os.makedirs(head)
        os.rename(abs_path, abs_dst)
  return files_changed

def adjust_files(mypath, fileExtension, keywords: dict):
  if os.path.isabs(mypath):
    raise ValueError
  else:
    abs_path_to_dir = os.path.normpath(os.path.join(os.path.dirname(__file__), mypath))
    with os.scandir(abs_path_to_dir) as iter:
      dirs, typescriptfiles = get_dirs_and_files_in_dir(iter, fileExtension)
      if len(dirs) != 0:
        for dir in dirs:
          adjust_files(os.path.normpath(os.path.join(mypath,dir)), fileExtension, keywords)
      for entry in typescriptfiles:
        data = []
        with open(os.path.normpath(os.path.join(abs_path_to_dir,entry)), "r") as file:
          data = file.readlines()
        formatted_data = []
        for i in range(len(data)):
          currentline = data[i]
          updatedline = currentline
          # if 'descendant_control' in currentline:
          #   print(currentline)
          for key in keywords.keys():
            # if 'descendant_control' == key:
            #   print('descendant_control')
            updatedline = re.sub(rf"\b{key}\b", keywords[key], updatedline)
            # if key in currentline:
            #   currentline = currentline.replace(key, keywords[key])
          formatted_data.append(updatedline)
        with open(os.path.normpath(os.path.join(abs_path_to_dir,entry)), "w") as file:
          file.writelines(formatted_data)


def main():
  fileExtension = '.ts'
  dir = os.path.dirname(__file__)
  keywords = {}
  for idx in range(1, len(sys.argv)):
    path = sys.argv[idx]
    keywords.update(change_case(path, fileExtension, case_change_fn=snake_to_camel))
  for idx in range(1, len(sys.argv)):
    adjust_files(snake_to_camel(path), fileExtension, keywords)


if __name__ == '__main__':
  main()