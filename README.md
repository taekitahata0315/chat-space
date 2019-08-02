# README

#membersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

#usersテーブル

｜Column|Type|Options|
|------|----|-------|
|name|string|null: false,index: true|


### Association
- has_many :tweets :through :members


#tweetsテーブル

|Column|Type|Options|
|------|----|-------|
|image|string|
|text|text|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

#groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false,|

### Association
- has_many :members 
- has_many :users :through :members
- has_many :tweets :through :members
