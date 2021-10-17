# MLDA_d4ddy


## Setup
### Setup repo
```
git clone https://github.com/bryanongse/dad-s-bush.git
git submodule update --init --recursive
```

### Option 1: Create virtual environment
Note for Windows users: `virtenv\Scripts\activate` to activate environment.
```
python -m venv venv
. venv/Scripts/activate
python -m pip install -U -r requirements.txt
```

### Option 2: Anaconda virtual environment
```
conda create --name daddy python=3.8
conda activate daddy
python -m pip install -U -r requirements.txt
```

## Usage
React-native app hosting
```
cd testApp
npm install
npm start
```

Flask server hosting
```
cd backend
python app.py
```

## Other parts of the solution
Segmentation training/serving submodule: https://github.com/rehohoho/mmsegmentation \
Depth-estimation serving submodule: https://github.com/rehohoho/AdaBins
